declare interface BaseReponse {
    success: boolean
}

declare interface AxiosError {
    response: {
        data: {
            message?: string
            error?: {
                message: string
            }
        }
    }
}

declare interface LocationCommon {
    state: {
        from?: { pathname?: string }
        filters?: import('../contexts/FiltersContext').Filters
    }
}

type Primitive = undefined | null | boolean | string | number | function

declare type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>
declare type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }
declare type PartialOn<T, K extends keyof T> = Omit<T, K> & { [P in K]: Partial<T[P]> }
declare type NullableOn<T, K extends keyof T> = Omit<T, K> & { [P in K]: T[P] | null }
declare type DeepPartial<T> = Partial<{ [P in keyof T]: DeepPartial<T[P]> }>
type DeepRequired<T> = T extends Primitive
    ? Required<T>
    : {
          [P in keyof T]-?: T[P] extends Array<infer U>
              ? Array<DeepRequired<U>>
              : T[P] extends ReadonlyArray<infer U2>
              ? DeepRequired<U2>
              : DeepRequired<T[P]>
      }

declare interface BaseResponse {
    success: boolean
}

declare interface ErrorResponse {
    message: string
}

declare interface ArrayFilters {
    $size?: 'empty' | 'fill'
}

declare interface FieldFilters<T> {
    $exists?: boolean
    $in?: T[]
    $not?: FieldFilters<T>
}

declare interface DateFilters extends FieldFilters<string> {
    $lt?: string
    $gt?: string
}

declare interface NumberFilters extends FieldFilters<string> {
    $lt?: number
    $gt?: number
}

declare interface GeoFilters {
    $geoWithin: {
        $box: number[][]
    }
}
