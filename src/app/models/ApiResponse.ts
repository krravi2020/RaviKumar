export interface ApiResponse<T> {
    error: string, 
    status: boolean, 
    alredyExist:string,
    name:string,
    CityName:string,
    data : T,
    action:T,
    MERCHANT_KEY:T,
    hash_string:T,
    hashh:T,
    posted:T,
    headers:T,
    txnid:T
    
    
}