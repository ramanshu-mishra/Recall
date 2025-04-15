const server = "http://localhost:3000";

interface contents{
    title : string,
    description: string,
    image: string,
    type : string,
    tags : {title: string}[],
    link : string
}

export { server };
export type { contents };