// src/types/common.ts
export interface PaginationQuery { page?: number | string; limit?: number | string; }
export interface PaginationMeta { current: number; total: number; count: number; }
