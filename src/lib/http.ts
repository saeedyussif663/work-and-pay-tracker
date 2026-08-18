import { TOKEN_KEY } from "@/context/auth-constants";
import { toast } from "sonner";
import token from "./token";

const baseUrl = import.meta.env.VITE_BACKEND_URL || "";

export const errorStyle = {
  backgroundColor: "#ef4444",
  color: "white",
  borderColor: "#ef4444",
};

export const successStyle = {
  backgroundColor: "#10b981",
  color: "white",
  borderColor: "#10b981",
};

export let getAuthToken: (() => string | null) | null = null;

export function setAuthTokenGetter(getter: () => string | null) {
  getAuthToken = getter;
}

/**
 * Handles errors returned by API responses.
 * @param response - The fetch response object.
 * @returns Throws an error or returns parsed data.
 */
async function handleErrors(response: Response): Promise<null | undefined> {
  if (response.status === 204) {
    return null;
  }

  const res = await response.json();

  if (response.status === 401) {
    toast.error(res.message || res.error, {
      style: errorStyle,
    });
    return;
  }

  if (!response.ok) {
    if (Array.isArray(res.message)) {
      res.message.forEach((error: unknown): void => {
        toast.error(error as string, {
          style: errorStyle,
        });
      });
      return;
    }

    if (res.errors && typeof res.errors === "object") {
      const errors = Object.values(res.message).flat();
      errors.forEach((error: unknown): void => {
        toast.error(error as string, {
          style: errorStyle,
        });
      });
      return;
    }

    if (response.status === 500) {
      toast.error("Internal Server error", {
        style: errorStyle,
      });
    } else {
      if (typeof res.message === "string") {
        toast.error(res.message, {
          style: errorStyle,
        });
        return;
      } else if (typeof res.errors === "string") {
        toast.error(res.error, {
          style: errorStyle,
        });
        return;
      } else if (typeof res.error === "string") {
        toast.error(res.error, {
          style: errorStyle,
        });
        return;
      } else {
        toast.error(res.error, {
          style: errorStyle,
        });
      }
    }

    throw new Error(`HTTP Error: ${response.status}`);
  }

  return res;
}

function setHeaders(config: {
  headers?: Record<string, string>;
  formData?: boolean;
}): Record<string, string> {
  const apiToken = token.get(TOKEN_KEY);

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...config.headers,
  };

  if (apiToken) {
    headers["Authorization"] = `Bearer ${apiToken}`;
  }

  if (!config.formData) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
}

/**
 * Sends a GET request to the API.
 * @param url - The endpoint URL.
 * @param params - Optional query parameters to append to the URL.
 * @param options - Optional configuration and additional headers for the request.
 * @param config - Optional or additonal configuration for the fetch api.
 * @returns The parsed response data.
 */
const get = async <T = unknown>(
  url: string,
  config: RequestInit = {},
  params?: Record<string, unknown>,
  options: { headers?: Record<string, string>; formData?: boolean } = {},
): Promise<T> => {
  let newUrl = `${url}`;
  if (params) {
    const queryParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    }

    if (queryParams.toString()) {
      newUrl += `?${queryParams.toString()}`;
    }
  }

  const response = await fetch(`${baseUrl}/${newUrl}`, {
    method: "GET",
    headers: setHeaders(options),
    ...config,
  });
  return handleErrors(response) as T;
};

/**
 * Sends a POST request to the API.
 * @param url - The endpoint URL.
 * @param data - The data to send in the request body.
 * @param options - Optional configuration and additional headers for the request.
 * @param config - Optional or additonal configuration for the fetch api.
 * @returns The parsed response data.
 */

const post = async <TResponse = unknown, TData = unknown>(
  url: string,
  data: TData,
  options: { headers?: Record<string, string>; formData?: boolean } = {},
  config: RequestInit = {},
): Promise<TResponse> => {
  const response = await fetch(`${baseUrl}/${url}`, {
    method: "POST",
    headers: setHeaders(options),
    body: options.formData ? (data as BodyInit) : JSON.stringify(data),
    ...config,
  });
  return handleErrors(response) as TResponse;
};

/**
 * Sends a PUT request to the API.
 * @param url - The endpoint URL.
 * @param data - The data to send in the request body.
 * @param options - Optional configuration and additional headers for the request.
 * @param config - Optional or additonal configuration for the fetch api.
 * @returns The parsed response data.
 */

const update = async <TResponse = unknown, TData = unknown>(
  url: string,
  data: TData,
  options: { headers?: Record<string, string>; formData?: boolean } = {},
  config: RequestInit = {},
): Promise<TResponse> => {
  const response = await fetch(`${baseUrl}/${url}`, {
    method: "PATCH",
    headers: setHeaders(options),
    body: options.formData ? (data as BodyInit) : JSON.stringify(data),
    ...config,
  });

  return handleErrors(response) as TResponse;
};

/**
 * Sends a DELETE request to the API.
 * @param url - The endpoint URL.
 * @param options - Optional configuration and additional headers for the request.
 * @param config - Optional or additonal configuration for the fetch api.
 * @returns The parsed response data.
 */

const destroy = async <TResponse = unknown, TData = unknown>(
  url: string,
  data: TData,
  options: { headers?: Record<string, string>; formData?: boolean } = {},
  config: RequestInit = {},
): Promise<TResponse> => {
  const response = await fetch(`${baseUrl}/${url}`, {
    method: "DELETE",
    headers: setHeaders(options),
    body: JSON.stringify(data),
    ...config,
  });

  return handleErrors(response) as TResponse;
};

export default {
  post,
  get,
  update,
  destroy,
};
