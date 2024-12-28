import { deletePlayerById } from '@/app/actions';
import { DeletePlayer } from '@/components/SubmitButton';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

interface PageProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ScoreDeleteRoute({
  params,
}: PageProps) {
  const { id } = params;
  
  return (
    <div className="h-[80vh] flex justify-center items-center w-full">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Are you absolutely sure?</CardTitle>
          <CardDescription>
            This action cannot be undone. This will permanently delete this
            Player and Performance data from the server.
          </CardDescription>
          <CardFooter className="justify-end flex gap-3 items-center">
            <Button variant="outline">
              <Link href="/dashboard/banners">Cancel</Link>
            </Button>
            <form action={deletePlayerById}>
              <input type="hidden" name="playerId" value={id} />
              <DeletePlayer />
            </form>
          </CardFooter>
        </CardHeader>
      </Card>
    </div>
  );
}
