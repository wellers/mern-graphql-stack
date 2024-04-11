import LoadObject from "./loadObject";
export interface Payload {
    query: string;
    variables?: object;
}
export declare function postRequest(endpoint: string, payload: Payload): Promise<LoadObject<any>>;
