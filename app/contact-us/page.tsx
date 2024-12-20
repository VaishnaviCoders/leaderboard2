import { ContactForm } from '@/components/contact-form';
// import prisma from '@/lib/db';

// const getContactFormData = async () => {
//     await prisma.c
// }

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <ContactForm />
    </div>
  );
}
