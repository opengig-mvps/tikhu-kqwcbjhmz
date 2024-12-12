"use client";

import React, { useState, useEffect } from "react";
import axios, { isAxiosError } from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { DateTimePicker } from "@/components/ui/date-picker";
import { LoaderCircleIcon } from "lucide-react";

interface Reservation {
  id: string;
  date: string;
  time: string;
  customer: {
    name: string;
    email: string;
  };
  status: string;
  preferences: string;
}

const AdminReservationsPage: React.FC = () => {
  const { data: session } = useSession();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/reservations`);
        setReservations(response?.data?.data);
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const updateReservationStatus = async (reservationId: string, newStatus: string) => {
    try {
      const response = await axios.patch(`/api/reservations/${reservationId}`, {
        status: newStatus,
      });

      if (response?.data?.success) {
        toast.success("Reservation status updated successfully!");
        setReservations((prev) =>
          prev?.map((res) =>
            res?.id === reservationId ? { ...res, status: newStatus } : res
          )
        );
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">Reservation Dashboard</h2>
      <Card>
        <CardHeader>
          <CardTitle>Reservations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {loading ? (
            <LoaderCircleIcon className="animate-spin" />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reservations?.map((reservation: Reservation) => (
                  <TableRow key={reservation?.id}>
                    <TableCell>{reservation?.date}</TableCell>
                    <TableCell>{reservation?.time}</TableCell>
                    <TableCell>{reservation?.customer?.name}</TableCell>
                    <TableCell>{reservation?.status}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">Update Status</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => updateReservationStatus(reservation?.id, "Confirmed")}>
                            Confirmed
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateReservationStatus(reservation?.id, "Cancelled")}>
                            Cancelled
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={() => console.log("Manage Seating")}>Manage Seating</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminReservationsPage;