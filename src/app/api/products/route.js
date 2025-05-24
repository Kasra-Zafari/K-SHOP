// import productsData from '@/data/products.json';

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const page = parseInt(searchParams.get("page")) || 1;
//   const limit = parseInt(searchParams.get("limit")) || 12;

//   const start = (page - 1) * limit;
//   const end = start + limit;
//   const paginated = productsData.products.slice(start, end);

//   return Response.json({
//     products: paginated,
//     total: productsData.products.length,
//   });
// }
