import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import dotenv from "dotenv";

dotenv.config();

class ThrottledAxiosClient {
    private axiosInstance: AxiosInstance;
    private requestQueue: (() => void)[] = [];
    private inProgress = 0;
    private maxRequestsPerSecond: number;
    private interval: NodeJS.Timeout | null = null;

    constructor(baseURL: string, maxRequestsPerSecond = 3) {
        this.axiosInstance = axios.create({
            baseURL,
        });
        this.maxRequestsPerSecond = maxRequestsPerSecond;
        this.startThrottler();
    }

    private startThrottler() {
        this.interval = setInterval(() => {
            while (
                this.inProgress < this.maxRequestsPerSecond &&
                this.requestQueue.length > 0
            ) {
                const nextRequest = this.requestQueue.shift();
                if (nextRequest) {
                    nextRequest();
                }
            }
        }, 1000);
    }

    //cleanup
    private stopThrottler() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    private enqueueRequest<T>(
        request: () => Promise<AxiosResponse<T>>,
    ): Promise<AxiosResponse<T>> {
        return new Promise((resolve, reject) => {
            const processRequest = () => {
                this.inProgress++;
                request()
                    .then(resolve)
                    .catch(reject)
                    .finally(() => {
                        this.inProgress--;
                    });
            };
            this.requestQueue.push(processRequest);
        });
    }

    public async get<T = any>(
        url: string,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return this.enqueueRequest(() =>
            this.axiosInstance.get<T>(url, config),
        );
    }

    public async post<T = any>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return this.enqueueRequest(() =>
            this.axiosInstance.post<T>(url, data, config),
        );
    }

    public async delete<T = any>(
        url: string,
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return this.enqueueRequest(() =>
            this.axiosInstance.delete<T>(url, config),
        );
    }
}

export const throttledClient = new ThrottledAxiosClient(
    process.env.API_URL!,
    1,
);
