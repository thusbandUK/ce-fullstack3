"use server"

import { fetchExamboards } from '@/app/lib/data';
import { ExamboardData, ModalContent } from '@/app/lib/definitions';
import MenuItem from '@/app/ui/dashboard/menuItem';
import { incrementExamboard } from '@/app/lib/actions';
import { Suspense } from "react";
import { CardSkeleton, ExamSkeleton } from "@/app/ui/dashboard/skeletons";
import DashboardSkeleton from '@/app/ui/dashboard/skeletons';
//not sure why it wasn't a problem before but the below refs an untracked file (in gitignore)
//hence crashed deployment w error
//import WrittenSummaryMock from '@/app/ui/dashboard/writtenSummaryMock';

export default async function Page() {

    

    return (
      <>
      {/*}
      <WrittenSummaryMock />
    */}
      </>
    )
}

/*
<Suspense key={x.id} fallback={<CardSkeleton />}></Suspense>
*/