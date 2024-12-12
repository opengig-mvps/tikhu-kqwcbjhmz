"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DateTimePicker } from "@/components/ui/date-picker";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import api from "@/lib/api";
import { LoaderCircleIcon } from "lucide-react";

const ConversationDashboard = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [calls, setCalls] = useState<any[]>([]);
  const [selectedCall, setSelectedCall] = useState<any>(null);
  const [filters, setFilters] = useState<{ date: Date | undefined; type: string; status: string }>({
    date: undefined,
    type: "",
    status: ""
  });

  useEffect(() => {
    if (!session) {
      return;
    }
    const fetchCalls = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/users/${session?.user?.id}/calls`);
        setCalls(res?.data?.data);
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCalls();
  }, [session]);

  const handleFilterChange = (e: any, key: string) => {
    setFilters({ ...filters, [key]: e?.target?.value });
  };

  const filteredCalls = calls?.filter(call => {
    if (filters?.date && new Date(call?.date).toDateString() !== filters?.date?.toDateString()) return false;
    if (filters?.type && call?.type !== filters?.type) return false;
    if (filters?.status && call?.status !== filters?.status) return false;
    return true;
  });

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">Conversation Dashboard</h2>
      <Card>
        <CardHeader>
          <CardTitle>Filter Calls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <DateTimePicker
                date={filters?.date}
                setDate={(date: any) => setFilters({ ...filters, date })}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Type"
                value={filters?.type}
                onChange={(e: any) => handleFilterChange(e, "type")}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Status"
                value={filters?.status}
                onChange={(e: any) => handleFilterChange(e, "status")}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Inbound Calls</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <LoaderCircleIcon className="w-8 h-8 animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Caller ID</TableHead>
                  <TableHead>Call Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCalls?.map((call: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{call?.callerId}</TableCell>
                    <TableCell>{call?.duration}</TableCell>
                    <TableCell>{call?.status}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" onClick={() => setSelectedCall(call)}>
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Call Details</DialogTitle>
                          </DialogHeader>
                          <div className="py-4">
                            <p>Caller ID: {selectedCall?.callerId}</p>
                            <p>Duration: {selectedCall?.duration}</p>
                            <p>Status: {selectedCall?.status}</p>
                            <p>Type: {selectedCall?.type}</p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversationDashboard;