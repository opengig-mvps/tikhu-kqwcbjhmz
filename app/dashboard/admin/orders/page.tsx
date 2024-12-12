"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { LoaderCircleIcon, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const OrderDashboard: React.FC = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  useEffect(() => {
    if (!session) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/admin/orders`);
        setOrders(res?.data?.data);
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error?.response?.data?.message ?? "Something went wrong");
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session]);

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const res = await api.patch(`/api/admin/orders/${orderId}`, { status });
      if (res?.data?.success) {
        toast.success("Order status updated successfully!");
        setOrders((prev) =>
          prev?.map((order) =>
            order?.id === orderId ? { ...order, status } : order
          )
        );
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
      }
    }
  };

  const notifyKitchen = (orderId: string) => {
    toast.success("Kitchen notified!");
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Order Dashboard</h2>
      <Card>
        <CardHeader>
          <CardTitle>Food Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <LoaderCircleIcon className="animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders?.map((order) => (
                  <TableRow key={order?.id}>
                    <TableCell>{order?.id}</TableCell>
                    <TableCell>{order?.customerName}</TableCell>
                    <TableCell>{order?.status}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button variant="outline">Update Status</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            textValue="pending"
                            onClick={() => updateOrderStatus(order?.id, "pending")}
                          >
                            Pending
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            textValue="completed"
                            onClick={() => updateOrderStatus(order?.id, "completed")}
                          >
                            Completed
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            textValue="cancelled"
                            onClick={() => updateOrderStatus(order?.id, "cancelled")}
                          >
                            Cancelled
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button
                        className="ml-2"
                        variant="outline"
                        onClick={() => notifyKitchen(order?.id)}
                      >
                        Notify Kitchen
                      </Button>
                      <Button
                        className="ml-2"
                        variant="outline"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
            </DialogHeader>
            <div className="p-4">
              <h3 className="text-lg font-bold">Customer Notes</h3>
              <p>{selectedOrder?.customerNotes}</p>
              <h3 className="text-lg font-bold mt-4">Special Requests</h3>
              <p>{selectedOrder?.specialRequests}</p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default OrderDashboard;