export interface RepositoryGetSingle<TDataItem> {
    getById(id: string): Promise<TDataItem | null>;
}

export interface RepositoryGetAll<TDataItem> {
    getAll(): Promise<TDataItem[]>
}

export interface RepositoryDelete {
    deleteById(id: string): Promise<void>;
}

export interface RepositoryCreate<TDataItem, TReturnedDataItem> {
    createItem(item: TDataItem): Promise<TReturnedDataItem>;
}

export interface RepositoryUpdate<TDataItem> {
    update: (id: string, patch: Partial<TDataItem>) => Promise<TDataItem>; 
}