// HTTP status
export const HTTP_STATUS = {
    success: {
        ok: {
            statusCode: 200,
            title: "OK",
            description: "The request was successful."
        },
        created: {
            statusCode: 201,
            title: "Created",
            description: "The resource was successfully created."
        },
        noContent: {
            statusCode: 204,
            title: "No Content",
            description: "The request was successful, but no content was returned."
        }
    },
    redirection: {
        movedPermanently: {
            statusCode: 301,
            title: "Moved Permanently",
            description: "The resource has been moved permanently to a new URL."
        },
        found: {
            statusCode: 302,
            title: "Found",
            description: "The resource is temporarily available at a different URL."
        },
        notModified: {
            statusCode: 304,
            title: "Not Modified",
            description: "The resource has not been modified since the last request."
        }
    },
    clientError: {
        badRequest: {
            statusCode: 400,
            title: "Bad Request",
            description: "The server could not understand the request."
        },
        unauthorized: {
            statusCode: 401,
            title: "Unauthorized",
            description: "Access is denied due to invalid credentials."
        },
        forbidden: {
            statusCode: 403,
            title: "Forbidden",
            description: "You don't have permission to access this resource."
        },
        notFound: {
            statusCode: 404,
            title: "Not Found",
            description: "The resource requested could not be found."
        },
        conflict: {
            statusCode: 409,
            title: "Conflict",
            description: "The request conflicts with the current state of the resource."
        }
    },
    serverError: {
        internalServerError: {
            statusCode: 500,
            title: "Internal Server Error",
            description: "Something went wrong on the server."
        },
        notImplemented: {
            statusCode: 501,
            title: "Not Implemented",
            description: "The server does not support the functionality required."
        },
        badGateway: {
            statusCode: 502,
            title: "Bad Gateway",
            description: "The server received an invalid response from the upstream server."
        },
        serviceUnavailable: {
            statusCode: 503,
            title: "Service Unavailable",
            description: "The server is currently unavailable."
        },
        gatewayTimeout: {
            statusCode: 504,
            title: "Gateway Timeout",
            description: "The server did not receive a timely response from the upstream server."
        }
    }
};