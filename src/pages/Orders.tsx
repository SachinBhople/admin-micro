import React from 'react';
import { useGetAllOrderQuery } from '../redux/api/adminApi';

const Orders: React.FC = () => {
    const { data, isLoading, isError } = useGetAllOrderQuery();
    console.log(data);

    if (isLoading) {
        return <div className="text-center mt-5"><div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div> Loading...</div>;
    }

    if (isError || !data) {
        return <div className="text-center mt-5 text-red-500">Error fetching orders
            {/* {error?.data?.message} */}
        </div>;
    }

    return (
        <div className="mx-4 my-6">
            <h1 className="mb-6 text-3xl font-bold text-gray-800">Order List</h1>
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
                {data && data.length > 0 ? (
                    <table className="min-w-full table-auto border-collapse">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="px-4 py-3 text-left">Order ID</th>
                                <th className="px-4 py-3 text-left">Product Name</th>
                                <th className="px-4 py-3 text-left">Description</th>
                                <th className="px-4 py-3 text-left">Price</th>
                                <th className="px-4 py-3 text-left">Quantity</th>
                                <th className="px-4 py-3 text-left">Image</th>
                                <th className="px-4 py-3 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {data.map((order: any) => (
                                order.productId.map((productItem: any) => (
                                    <tr key={productItem._id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-3">{order._id}</td>
                                        <td className="px-4 py-3">{productItem.product.name}</td>
                                        <td className="px-4 py-3">{productItem.product.desc}</td>
                                        <td className="px-4 py-3">₹{productItem.product.price}</td>
                                        <td className="px-4 py-3">{productItem.qty}</td>
                                        <td className="px-4 py-3">
                                            <img
                                                src={productItem.product.hero}
                                                alt={productItem.product.name}
                                                className="h-16 w-16 object-cover rounded-lg mx-auto"
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`inline-block px-3 py-1 rounded-full text-white text-xs ${order.status === 'delivered'
                                                    ? 'bg-green-500'
                                                    : order.status === 'placed'
                                                        ? 'bg-yellow-500'
                                                        : 'bg-red-500'
                                                    }`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        {/* <td className="px-4 py-3">{new Date(order.createdAt).toLocaleString()}</td> */}

                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-500">No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default Orders;





