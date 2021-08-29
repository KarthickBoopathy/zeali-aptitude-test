

export function get(path: any)
{
    return fetch(path, {
        method: 'get'
    });
}