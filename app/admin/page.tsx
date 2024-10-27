import React from 'react';
import Link from "next/link";
import routes from "@/constants/routes";
import Image from "next/image";
import source from "@/constants/source";
import StatCard from "@/components/app/card/StatCard";
import icons from "@/constants/icons";
import {getRecentAppointmentList} from "@/lib/actions/appointment.actions";
import {DataTable} from "@/components/data-table/data-table";
import {columns} from "@/components/data-table/columns";

const Admin = async () => {
    const appointments = await getRecentAppointmentList()
    return (
        <div className="mx-auto flex max-w-7xl flex-col space-y-14">
            <header className="admin-header">
                <Link href={routes.home} className="cursor-pointer">
                    <Image
                        src={source.patient}
                        height={32}
                        width={162}
                        alt="logo"
                        className="h-8 w-fit"
                    />
                </Link>
                <p className="text-16-semibold">Admin Dashboard</p>
            </header>
            <main className="admin-main">
                <section className="w-ull space-y-4">
                    <h1 className="header">Welcome, Admin</h1>
                    <p className="text-dark-700"> Start the day with managing new appointments</p>
                </section>

                <section className="admin-stat">
                    <StatCard
                        type="appointments"
                        count={appointments.scheduledCount}
                        label="Scheduled appointments"
                        icon={icons.appointment.icon}
                    />
                    <StatCard
                        type="pending"
                        count={appointments.pendingCount}
                        label="Pending appointments"
                        icon={icons.pending.icon}
                    />
                    <StatCard
                        type="cancelled"
                        count={appointments.cancelledCount}
                        label="Cancelled appointments"
                        icon={icons.cancelled.icon}
                    />
                </section>

                <DataTable columns={columns} data={appointments.documents}/>
            </main>
        </div>
    );
};

export default Admin;