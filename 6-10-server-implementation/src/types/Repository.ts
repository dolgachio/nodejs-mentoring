export interface Repository<T> {
    all(): Promise<T[]>;
    getById(id: string): Promise<T | null>;
    deleteById(id: string): Promise<void>;
    
    update?: (id: string, patch: Partial<T>) => Promise<void>; 
}