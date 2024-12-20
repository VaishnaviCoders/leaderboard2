import Image from 'next/image';
import logo from '../public/header_logo-transformed-1.png';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CircleAlert } from 'lucide-react';

export default function NavBar() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
      <nav className="flex items-center justify-between">
        <div>
          <Image src={logo} alt="logo" width={200} height={100} />
        </div>
        <div>
          {' '}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="text-blue-500">
                <CircleAlert />
                Instructions
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Application Usage Guide</DialogTitle>
                <DialogDescription>
                  Follow these steps to navigate the application effectively.
                </DialogDescription>
              </DialogHeader>
              <ul className="my-6 ml-6 list-disc ">
                <li className="leading-7 [&:not(:first-child)]:mt-4 hover:text-blue-500 cursor-pointer text-base">
                  Select Event: Choose the specific event (e.g., 3x3 Cube, 2x2
                  Cube) you wish to view.
                </li>
                <li className="leading-7 [&:not(:first-child)]:mt-4 hover:text-blue-500 cursor-pointer text-base">
                  Choose Age Category: Pick the relevant age group to see the
                  rankings.
                </li>
                <li className="leading-7 [&:not(:first-child)]:mt-4 hover:text-blue-500 cursor-pointer text-base">
                  View Rankings: The leaderboard will display the results for
                  the selected event and age category.
                </li>
              </ul>

              <DialogFooter>
                <DialogClose asChild>
                  <Button className="" type="submit">
                    Thank you!
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </div>
  );
}
