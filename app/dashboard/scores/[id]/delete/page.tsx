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

export default function ScoreDeleteRoute({
  params,
}: {
  params: { id: string };
}) {
  return (
    <>
      <div className="h-[80vh] flex justify-center items-center w-full">
        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle>Are you absolutely sure ?</CardTitle>
            <CardDescription>
              This action cannot be undone. This will permanently delete this
              Banner and all data from server.
            </CardDescription>
            <CardFooter className="justify-end flex gap-3 items-center">
              <Button variant="outline" className="">
                <Link href="/dashboard/banners">Cancel</Link>
              </Button>
              <form action={deletePlayerById}>
                <input type="hidden" name="playerId" value={params.id} />
                <DeletePlayer />
              </form>
            </CardFooter>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}
