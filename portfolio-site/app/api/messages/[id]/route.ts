import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Message from '@/models/Message';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const body = await request.json();
    const message = await Message.findByIdAndUpdate(params.id, body, { new: true });
    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update message' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    await Message.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Message deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}
