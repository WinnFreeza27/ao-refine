export const httpErrors = {
    400: {
      title: "Bad Request",
      description: "The server could not understand the request due to invalid syntax."
    },
    401: {
      title: "Unauthorized",
      description: "The client must authenticate itself to get the requested response."
    },
    403: {
      title: "Forbidden",
      description: "The client does not have access rights to the content."
    },
    404: {
      title: "Not Found",
      description: "The server can not find the requested resource."
    },
    405: {
      title: "Method Not Allowed",
      description: "The request method is known by the server but is not supported by the target resource."
    },
    408: {
      title: "Request Timeout",
      description: "The server would like to shut down this unused connection."
    },
    500: {
      title: "Internal Server Error",
      description: "The server has encountered a situation it doesn't know how to handle."
    },
    502: {
      title: "Bad Gateway",
      description: "The server, while acting as a gateway or proxy, received an invalid response from the upstream server."
    },
    503: {
      title: "Service Unavailable",
      description: "The server is not ready to handle the request."
    },
    504: {
      title: "Gateway Timeout",
      description: "The server, while acting as a gateway or proxy, did not get a response in time from the upstream server."
    }
  };