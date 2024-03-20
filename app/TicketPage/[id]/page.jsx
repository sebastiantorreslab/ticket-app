import React from "react";
import TicketForm from "@/app/(components)/TicketForm";

const TicketPage = async ({ params }) => {
  const getTicketById = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("failed to get Ticket");
      }
      return res.json();
    } catch (error) {
      return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
  };
  const EDITMODE = params.id === "new" ? false : true;

  let updateTicketData = {};

  if (EDITMODE) {
    updateTicketData = await getTicketById(params.id);
    updateTicketData = updateTicketData.foundTicket;
  } else {
    updateTicketData = {
      _id: "new",
    };
  }

  return <TicketForm ticket={updateTicketData} />;
};

export default TicketPage;
