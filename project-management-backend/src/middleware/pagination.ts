import { Request, Response, NextFunction } from "express";
import { PaginationQuery } from "../types";

export interface PaginatedRequest extends Request {
  pagination?: {
    page: number;
    limit: number;
    offset: number;
    search?: string;
    sort: string;
    order: "ASC" | "DESC";
  };
}

export const paginationMiddleware = (
  req: PaginatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = Math.min(parseInt(req.query.limit as string) || 10, 100);
  const offset = (page - 1) * limit;
  const search = req.query.search as string;
  const sort = (req.query.sort as string) || "createdAt";
  const order =
    (req.query.order as string)?.toUpperCase() === "ASC" ? "ASC" : "DESC";

  req.pagination = {
    page,
    limit,
    offset,
    search,
    sort,
    order,
  };

  next();
};

export const createPaginatedResponse = (
  data: any[],
  total: number,
  page: number,
  limit: number
) => {
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    data,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: total,
      itemsPerPage: limit,
      hasNextPage,
      hasPrevPage,
      nextPage: hasNextPage ? page + 1 : null,
      prevPage: hasPrevPage ? page - 1 : null,
    },
  };
};
