import { get } from "./fetch";

export const getAllCategory = async () => {
    try{
        let category = await get('category');

        return category
    }catch(error){
        console.log(error)
        return []
    }
}

export function getCategoryWithChild (categories: any, parentId = null) {
    // console.log({categories})
    const categoryList: any = [];
    let category;
    if (parentId == null) {
        // console.log(category,"parent null", "parentid", parentId)
        category = categories.filter((cat: any) => cat.parentId == undefined);
    } else {
        category = categories.filter((cat: any) => cat.parentId == parentId);
        // console.log(category," parent", "parentid", parentId)
    }
    // console.log(category)
    // console.log(categories)
    for (var cate of category) {
        // console.log(cate?.color)
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            color : cate.color,
            parentId: cate.parentId,
            image: cate.image,
            active: cate.active,
            isMedia: cate.isMedia,
            // type: cate.type,
            children: getCategoryWithChild(categories, cate._id)
        })
    }
    // console.log(categoryList)
    return categoryList;
}

export const createCategories = (categories : any) => {
    let newCategories = categories.filter((item: any) => {
        // console.log(item)

        return {
            _id: item._id.toString(),
            name: item.name,
            slug: item.slug,
            image: item.image,
            active:  item.active,
            parentId: item.parentId,
            color: item.color,
        }
    })

    return newCategories

}

export const buildNewCategories = (parentId: any, categories: any, category: any) => {
    let newCategories: any = [];
    if (parentId === null) {
        return [
            ...categories, {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                active: category.active,
                children: []
            }
        ]
    }
    for (let cate of categories) {
        if (cate._id === parentId) {
            let newCategory = {
                _id: category._id,
                name: category.name,
                slug: cate.slug,
                parentId: category.parentId,
                active: category.active,
                children: [],

            };
            newCategories.push({
                ...cate,
                children: cate.children.length > 0 ? [...cate.children, newCategory] : [newCategory]
            })
        } else {

            newCategories.push({
                ...cate,
                children: cate.children ? buildNewCategories(parentId, cate.children, category) : [],

            })
        }
    }
    return newCategories;
}