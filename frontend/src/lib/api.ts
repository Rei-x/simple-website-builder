/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/v1/website": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["WebsiteController_findAll_v1"];
        put?: never;
        post: operations["WebsiteController_create_v1"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1/website/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["WebsiteController_findOne_v1"];
        put?: never;
        post?: never;
        delete: operations["WebsiteController_remove_v1"];
        options?: never;
        head?: never;
        patch: operations["WebsiteController_update_v1"];
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        CreateWebsiteDto: {
            name: string;
            title?: string;
        };
        BlockEntity: {
            props: Record<string, never>;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
            id: string;
            websiteId: number;
            order: number;
            type: string;
        };
        WebsiteEntity: {
            id: number;
            name: string;
            domain: string;
            title: string;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
            blocks: components["schemas"]["BlockEntity"][];
        };
        CreateBlockDto: {
            props: Record<string, never>;
            id: string;
            type: string;
        };
        UpdateWebsiteDto: {
            domain?: string;
            blocks: components["schemas"]["CreateBlockDto"][];
            name?: string;
            title?: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    WebsiteController_findAll_v1: {
        parameters: {
            query?: {
                /** @description Filter by domain */
                domain?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WebsiteEntity"][];
                };
            };
        };
    };
    WebsiteController_create_v1: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateWebsiteDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WebsiteEntity"];
                };
            };
        };
    };
    WebsiteController_findOne_v1: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WebsiteEntity"];
                };
            };
        };
    };
    WebsiteController_remove_v1: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": string;
                };
            };
        };
    };
    WebsiteController_update_v1: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateWebsiteDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WebsiteEntity"];
                };
            };
        };
    };
}