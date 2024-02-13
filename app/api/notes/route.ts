import { NextRequest, NextResponse } from "next/server";
import { Note } from "../lib/definitions";

// app/api/users/route.ts
let list: Note[] = [
  {
    id: 0,
    title: "Play soccer",
  },
  {
    id: 1,
    title: "Homework",
  },
  {
    id: 2,
    title: "Video Game",
  },
];
let _AutoIncrementId: number = list.length;

export async function GET(_: NextRequest) {
  return NextResponse.json(list);
}

export async function POST(req: NextRequest) {
  const { title } = await req.json();
  const note: Note = { id: _AutoIncrementId++, title: title };
  list.push(note);
  return NextResponse.json(note);
}

export async function PUT(req: NextRequest) {
  const { id, title } = await req.json();
  const note = list.find((note) => note.id == id);
  try {
    note!.title = title;
    return NextResponse.json(note);
  } catch (error) {
    return NextResponse.json("error");
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const idx = list.findIndex((note) => note.id == id);
  try {
    list.splice(idx, 1);
    return NextResponse.json(list);
  } catch (error) {
    return NextResponse.json("error");
  }
}
