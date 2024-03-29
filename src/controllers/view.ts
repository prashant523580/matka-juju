// import Views from "@/models/views";
// import mongoose from "mongoose";

// export function getFilterOptions(filter: any) {
//   const currentDate = new Date();
//   currentDate.setHours(0, 0, 0, 0);

//   switch (filter) {
//     case 'day':
//       return { createdAt: { $gte: currentDate } };
//     case 'week':
//       const firstDayOfWeek = currentDate.getDate() - currentDate.getDay();
//       const startDateOfWeek = new Date(currentDate.setDate(firstDayOfWeek));
//       startDateOfWeek.setHours(0, 0, 0, 0);
//       const endDateOfWeek = new Date(startDateOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000);
//       return { createdAt: { $gte: startDateOfWeek, $lt: endDateOfWeek } };
//     case 'month':
//       const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
//       firstDayOfMonth.setHours(0, 0, 0, 0);
//       const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
//       lastDayOfMonth.setHours(23, 59, 59, 999);
//       return { createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth } };
//     case 'year':
//       const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
//       firstDayOfYear.setHours(0, 0, 0, 0);
//       const lastDayOfYear = new Date(currentDate.getFullYear(), 11, 31);
//       lastDayOfYear.setHours(23, 59, 59, 999);
//       return { createdAt: { $gte: firstDayOfYear, $lte: lastDayOfYear } };
//     default:
//       return {};
//   }
// }
// export async function getViewsByPeriod(filterOptions : any) {
//     const viewsByPeriod = await Views.aggregate([
//       { $match: filterOptions },
//       {
//         $group: {
//           _id: {
//             year: { $year: '$createdAt' },
//             month: { $month: '$createdAt' },
//             day: { $dayOfMonth: '$createdAt' },
//           },
//           views: { $sum: '$count' },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           date: {
//             $dateFromParts: {
//               year: '$_id.year',
//               month: '$_id.month',
//               day: '$_id.day',
//             },
//           },
//           views: 1,
//         },
//       },
//       { $sort: { date: 1 } },
//     ]).exec();
  
//     return viewsByPeriod;
//   }

//   export function getWeekViews(stats :any) {
//     const weekViews = [];
//     let currentWeek : any = [];
  
//     stats.forEach(({ year, month, day, views } : any) => {
//       const currentDate = new Date(year, month - 1, day);
//       const weekDay = currentDate.getDay();
  
//       if (weekDay === 0 && currentWeek.length > 0) {
//         const weekStartDate = new Date(currentWeek[0].year, currentWeek[0].month - 1, currentWeek[0].day);
//         const weekEndDate = new Date(year, month - 1, day - 1);
  
//         weekViews.push({
//           startDate: weekStartDate,
//           endDate: weekEndDate,
//           views: currentWeek.reduce((total: any, { views }: any) => total + views, 0),
//         });
  
//         currentWeek = [];
//       }
  
//       currentWeek.push({ year, month, day, views });
//     });
  
//     if (currentWeek.length > 0) {
//       const weekStartDate = new Date(currentWeek[0].year, currentWeek[0].month - 1, currentWeek[0].day);
//       const weekEndDate = new Date(currentWeek[currentWeek.length - 1].year, currentWeek[currentWeek.length - 1].month - 1, currentWeek[currentWeek.length - 1].day);
  
//       weekViews.push({
//         startDate: weekStartDate,
//         endDate: weekEndDate,
//         views: currentWeek.reduce((total: any, { views }: any) => total + views, 0),
//       });
//     }
  
//     return weekViews;
//   }

//   export const getPostViews = async (postId :any, interval :any) => {
//     const viewsData = await Views.aggregate([
//       {
//         $match: { viewId :new mongoose.Types.ObjectId(postId) },
//       },
//       {
//         $group: {
//           _id: {
//             year: { $year: '$createdAt' },
//             month: { $month: '$createdAt' },
//             week: { $week: '$createdAt' },
//             day: { $dayOfMonth: '$createdAt' },
//           },
//           views: { $sum: '$count' },
//         },
//       },
//       {
//         $group: {
//           _id: getGroupByCriteria(interval),
//           views: { $sum: '$views' },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           interval,
//           views: 1,
//         },
//       },
//       { $sort: { interval: 1 } },
//     ]);
  
//     return viewsData;
//   };
  
//   // Helper function to determine the grouping criteria based on the interval
//   export const getGroupByCriteria = (interval :any) => {
//     if (interval === 'daily') {
//       return {
//         year: '$_id.year',
//         month: '$_id.month',
//         day: '$_id.day',
//       };
//     } else if (interval === 'monthly') {
//       return {
//         year: '$_id.year',
//         month: '$_id.month',
//       };
//     } else if (interval === 'weekly') {
//       return {
//         year: '$_id.year',
//         week: '$_id.week',
//       };
//     } else if (interval === 'yearly') {
//       return {
//         year: '$_id.year',
//       };
//     }
//   };

//   export 
//   // Get per post per day views
//   const getPerPostDailyViews = async (postId:any) => {
//     const viewsData = await Views.aggregate([
//       {
//         $match: { viewId : new mongoose.Types.ObjectId(postId) },
//       },
//       {
//         $group: {
//           _id: {
//             year: { $year: '$createdAt' },
//             month: { $month: '$createdAt' },
//             day: { $dayOfMonth: '$createdAt' },
//           },
//           count: { $sum: '$count' },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           date: {
//             $dateToString: {
//               format: '%Y-%m-%d',
//               date: {
//                 $dateFromParts: {
//                   year: '$_id.year',
//                   month: '$_id.month',
//                   day: '$_id.day',
//                 },
//               },
//             },
//           },
//           count: 1,
//         },
//       },
//       { $sort: { date: 1 } },
//     ]);
  
//     return viewsData;
//   };
  
//   // Get per post per week views
// export  const getPerPostWeeklyViews = async (postId:any) => {
//     const viewsData = await Views.aggregate([
//       {
//         $match: {viewId : new mongoose.Types.ObjectId(postId) },
//       },
//       {
//         $group: {
//           _id: {
//             year: { $year: '$createdAt' },
//             week: { $week: '$createdAt' },
//           },
//           count: { $sum: '$count' },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           week: '$_id.week',
//           year: '$_id.year',
//           count: 1,
//         },
//       },
//       { $sort: { year: 1, week: 1 } },
//     ]);
  
//     return viewsData;
//   };
  
//   // Get per post per month views
// export   const getPerPostMonthlyViews = async (postId:any) => {
//     const viewsData = await Views.aggregate([
//       {
//         $match: { viewId : new mongoose.Types.ObjectId(postId)},
//       },
//       {
//         $group: {
//           _id: {
//             year: { $year: '$createdAt' },
//             month: { $month: '$createdAt' },
//           },
//           count: { $sum: '$count' },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           year: '$_id.year',
//           month: '$_id.month',
//           count: 1,
//         },
//       },
//       { $sort: { year: 1, month: 1 } },
//     ]);
  
//     return viewsData;
//   };
  
//   // Get per post per year views
//  export  const getPerPostYearlyViews = async (postId:any) => {
//     const viewsData = await Views.aggregate([
//       {
//         $match: { viewId : new mongoose.Types.ObjectId(postId) },
//       },
//       {
//         $group: {
//           _id: { $year: '$createdAt' },
//           count: { $sum: '$count' },
//         },
//       },
//       {
//         $project: {
//           _id: 0,
//           year: '$_id',
//           count: 1,
//         },
//       },
//       { $sort: { year: 1 } },
//     ]);
  
//     return viewsData;
//   };
  