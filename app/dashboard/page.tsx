"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Users, Package, FileText, MapPin } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCounts, selectCounts, selectLoading } from "@/lib/redux/features/countSlice";
import { AppDispatch } from "@/lib/redux/store";

// Recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const stats = useSelector(selectCounts);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchCounts());
  }, [dispatch]);

  const chartData = [
    { name: "Blogs", value: stats?.blogs || 0 },
    { name: "Products", value: stats?.products || 0 },
    { name: "Services", value: stats?.services || 0 },
    { name: "Leads", value: stats?.leads || 0 },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500 text-lg">
        Loading dashboard data...
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-0 px-2 flex flex-col gap-8 ">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 bg-green-50 rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex-shrink-0 flex items-center justify-center">
          <Image
            src="/logo.jpg"
            alt="Green Energy Logo"
            width={180}
            height={80}
            priority
            className="rounded-xl"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1
            className="text-3xl md:text-4xl font-extrabold text-[var(--primary-green)] mb-2 "
            style={{ fontFamily: "var(--font-main)" }}
          >
            Welcome to Green Energy 
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
            Track your leads, users, services, and products all in one place.
            Powering a sustainable future with clean insights.
          </p>
        </div>
      </div>

      {/* Power Generation Analysis (Bar Chart) */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 flex flex-col gap-8">
        <h2
          className="text-xl font-bold text-[var(--primary-green)] mb-4"
          style={{ fontFamily: "var(--font-main)" }}
        >
          Power Generation Analysis
        </h2>

        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="var(--primary-green)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="text-sm text-center text-gray-500">
          Green energy metrics visualized by module usage and service
          engagement.
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        <StatCard
          title="Users"
          value={stats?.users || 0}
          icon={<Users className="w-10 h-10 text-[var(--primary-green)]" />}
          borderColor="var(--primary-green)"
          textColor="var(--primary-green)"
        />
        <StatCard
          title="Products"
          value={stats?.products || 0}
          icon={
            <Package className="w-10 h-10 text-[var(--primary-light-green)]" />
          }
          borderColor="var(--primary-light-green)"
          textColor="var(--primary-light-green)"
        />
        <StatCard
          title="Leads"
          value={stats?.leads || 0}
          icon={<FileText className="w-10 h-10 text-[var(--primary-green)]" />}
          borderColor="var(--primary-green)"
          textColor="var(--primary-green)"
        />
        <StatCard
          title="Services"
          value={stats?.services || 0}
          icon={
            <MapPin className="w-10 h-10 text-[var(--primary-light-green)]" />
          }
          borderColor="var(--primary-light-green)"
          textColor="var(--primary-light-green)"
        />
        <StatCard
          title="Blogs"
          value={stats?.blogs || 0}
          icon={<FileText className="w-10 h-10 text-[var(--primary-green)]" />}
          borderColor="var(--primary-green)"
          textColor="var(--primary-green)"
        />
      </div>
    </div>
  );
};

export default DashboardPage;

// Reusable StatCard component
interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  borderColor: string;
  textColor: string;
}

const StatCard = ({
  title,
  value,
  icon,
  borderColor,
  textColor,
}: StatCardProps) => (
  <div
    className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center justify-center hover:shadow-2xl transition-all border"
    style={{ borderColor, minHeight: "220px", width: "100%" }}
  >
    <div className="mb-4">{icon}</div>
    <div
      className="text-4xl font-extrabold"
      style={{ color: textColor, fontFamily: "var(--font-main)" }}
    >
      {value}
    </div>
    <div className="text-base text-gray-600 mt-2 tracking-wide uppercase font-medium">
      {title}
    </div>
  </div>
);
