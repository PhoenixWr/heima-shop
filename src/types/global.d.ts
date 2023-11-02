/** 通用分页结果类型 */
export type PageResult<T> = {
  /** 总条数 */
  counts: number
  /** 每页条数 */
  pageSize: number
  /** 总页数 */
  pages: number
  /** 当前页数 */
  page: number
  /** 当前页数据 */
  items: T[]
}

/** 通用分页参数类型 */
export type PageParams = {
  /** 页码：默认值为 1 */
  page?: number
  /** 分页尺寸：默认值为 10 */
  pageSize?: number
}
