export function combine(...args: string[]){
    let ans = "";
    for(const str of args){
        ans = ans + str + " ";
    }
    return ans;
}