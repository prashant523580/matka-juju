

export const get = async (url:any) => {
    try{

        let res = await fetch(`${process.env.NEXT_PUBLIC_API}/${url}`,{
            method:"GET",
            // cache:"no-cache"
            next:{
                revalidate:30
            }
        })
        if(!res.ok) throw Error("Faild to fetch data.")
        return  res.json()
    }catch(error){
        console.log(error)
        return []
    }
}
export const authGet = async (url:any,token:any) => {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API}/${url}`,{
        method:"GET",
        cache:"no-cache",
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    if(!res.ok) throw Error("Faild to fetch data.")
    return  res.json()
}

export const post = async (url:any,payload:any,token:any) => {
    try{
        let res = await fetch(`${process.env.NEXT_PUBLIC_API}/${url}`,{
            method:"POST",
            body:JSON.stringify(payload),
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        return  res.json();
    }catch(error){
        console.log(error)
    }

}
export const update = async (url:any,payload:any,token:any) => {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API}/${url}`,{
        method:"PUT",
        body:JSON.stringify(payload),
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    return res.json()
}

export const remove = async (url:string,id:any,token:string) => {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API}/${url}/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    return res.json();
}
