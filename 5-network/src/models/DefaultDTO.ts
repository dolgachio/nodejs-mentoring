export interface DefaultDTOLinks {
    [action: string]: { href: string };
}


export interface DefaultDTO<TData> {
    data: TData;
    _links?: DefaultDTOLinks;
}