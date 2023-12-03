export interface RepositoryBase<TDataItem> {
    all(): Promise<TDataItem[]>;
    getById(id: string): Promise<TDataItem | null>;
}

export interface RepositoryDelete {
    deleteById(id: string): Promise<void>;
}

export interface RepositoryUpdate<TDataItem> {
    update: (id: string, patch: Partial<TDataItem>) => Promise<void>; 
}