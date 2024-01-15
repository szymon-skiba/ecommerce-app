
import { Fish } from "./fish";

export class FishResponse {
    isFirst: boolean;
    isLast: boolean;
    hasNext: boolean;
    hasPrevious: boolean;
    data: Fish[];
    totalElements: number;
    pageNumber: number;
    totalPages: number;
  
    constructor(
      isFirst: boolean,
      isLast: boolean,
      hasNext: boolean,
      hasPrevious: boolean,
      data: Fish[],
      totalElements: number,
      pageNumber: number,
      totalPages: number
    ) {
      this.isFirst = isFirst;
      this.isLast = isLast;
      this.hasNext = hasNext;
      this.hasPrevious = hasPrevious;
      this.data = data;
      this.totalElements = totalElements;
      this.pageNumber = pageNumber;
      this.totalPages = totalPages;
    }
  }