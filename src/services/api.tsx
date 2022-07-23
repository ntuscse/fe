class Api {
    // private API_ORIGIN: string
    //
    // constructor() {
    //     this.API_ORIGIN = 'https://api.dev.ntuscse.com'
    // }

    // http methods
    // eslint-disable-next-line class-methods-use-this
    private async get(urlPath: string): Promise<Record<string, any>> {
        console.log('get()')
        const response = await fetch(`https://api.dev.ntuscse.com${urlPath}`)
        return response.json()
    }

    // eslint-disable-next-line class-methods-use-this
    async getProducts() {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/`)
        return response.json()
    }
}

export const api = new Api()
