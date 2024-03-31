import { getCategoryBySlug } from "@/controllers/category";
import {  updateProduct } from "@/controllers/product";
// import { authMiddleware } from "@/lib/authMiddleware";
import Category from "@/models/category";
import Product from "@/models/product";
import connectToMongodb from "@/utils/db/dbcon";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
// import schedule from "node-schedule";
export async function GET(req: NextRequest, { searchParams }: any) {
  let pipeline: any = [
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    // {
    //   $lookup: {
    //     from: "users",
    //     localField: "createdBy",
    //     foreignField: "_id",
    //     as: "createdBy",
    //   },   
    // },
    {
      $sort: {
        createdAt: -1
      }
    },
    { "$unwind": "$category" },
    // { "$unwind": "$createdBy" },
    {
      $project: {
        "_id": 1,
        "name": 1,
        "slug": 1,
        "description": 1,
        "price": 1,
        // "model": 1,
        "size": 1,
        "category": 1,
        "images": 1,
        "isOffer": 1,
        'discount': 1,
        "createdAt": 1,
        "updatedAt": 1,
        "keywords": 1,
        // "colors": 1
      }
    }
  ];
  try {
    await connectToMongodb();
    await Category.find();
    // let query = req.url.split("?")[1].replace("&&",",");
    // let querySlug: any = req.nextUrl.searchParams.get("slug");
    // let querySkip: any = req.nextUrl.searchParams.get("skip");
    let queryCategory = req.nextUrl.searchParams.get("category");
    let queryPrice = req.nextUrl.searchParams.get("price");
    let queryPriceSort = req.nextUrl.searchParams.get("sort");
    const searchQuery = req.nextUrl.searchParams.get("search");
    let posts: any;
    // let category: any = await getCategoryBySlug(querySlug);
    if (queryCategory != null && queryCategory !== "") {
      pipeline.push({
        $match: {
          'category.slug': {
            $in: JSON.parse(queryCategory)
          }
        }
      })
    } if (queryPrice !== null && queryPrice !== "") {
      pipeline.push({
        $match: {
          price: {
            $gte: 0, $lte: Number(queryPrice)
          }
        }
      })
    }
    if (queryPriceSort) {
      pipeline.push({
        $sort: {
          price: queryPriceSort === "low-to-high" ? 1 : -1
        }
      })
    }
   
    if (searchQuery !== null && searchQuery !== "") {
      // console.log(searchQuery)
     posts = await Product.aggregate([
     
      {
          $search: {
            index: "autocomplete",
            autocomplete: {
              query: searchQuery,
              path: "name",
              fuzzy: {
                maxEdits:1
              },
              tokenOrder: "sequential"
            }
           
          }
        },
        {
          $lookup: {
            from: "categories",
            localField: "category",
            foreignField: "_id",
            as: "category",
          },
        },
        { "$unwind": "$category" },
        {
          $sort: {
            name: 1
          }
        },
        {
          $limit:10
        },
        {
          $project: {
            "_id":1,
            "name": 1,
            "slug": 1,
            "category": 1,
            "images":1
          }
        }
      ]).collation({ locale: "en" });

     
    }else{

      posts = await Product.aggregate(pipeline).collation({ locale: "en" });
    }


    // console.log(pipeline)
    // posts = await Product.find(filter).populate("category", "name slug").populate("createdBy", "name image").sort({ createdAt: -1 });
    return new NextResponse(JSON.stringify(posts))
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      error,
      message: "Somethings went wrong",
      success: false
    })
  }
}

export async function POST(req: NextRequest) {
  await connectToMongodb()
  try {
    // let authorization = await authMiddleware(req);
    // if (!authorization.success) {
    //     return NextResponse.json({
    //         message: "method not Allowed.",
    //         success: false
    //     }, {
    //         status: 400,
    //         statusText: "Bad Request."
    //     })
    // }
    let newPost = await req.json();
    let existedProduct = await Product.findOne({
      name: newPost.name
    });
    // console.log(existedProduct)
    if (existedProduct) return NextResponse.json({
      message: 'Already exist Products.',
      success: false
    }, {
      status: 400
    })
    let post = await Product.create({
      ...newPost,
      slug: slugify(newPost.name)
      // createdBy: authorization._id
    });
    // post = await post.;
    let currentpost = await Product.findById(post._id).populate("createdBy", "name image").populate("category", "name slug")
    // console.log(authorization)
    // console.log(currentpost)
    return NextResponse.json({
      product: currentpost,
      // post: newPost,
      message: "successfully created post.",
      success: true
    }, {
      status: 201
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      error,
      message: "somethings went wrong",
      success: false
    }, {
      status: 400
    })
  }

}

export async function PUT(req: NextRequest) {
  try {
    await connectToMongodb()
    let data = await req.json();
    let updatedPost = await updateProduct(data);

    // console.log(data) 
    return NextResponse.json({
      message: "updated successfully.",
      success: true,
      post: updatedPost
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      error,
      message: "somethings went wrong",
      success: false
    }, {
      status: 400
    })
  }
}