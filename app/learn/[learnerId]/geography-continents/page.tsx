import {redirect,notFound} from "next/navigation";
import {createClient} from "@/lib/supabase/server";
import Lesson from "@/app/geography-preview/page";
export default async function Page({params}:{params:Promise<{learnerId:string}>}){const {learnerId}=await params;const db=await createClient();const {data:{user}}=await db.auth.getUser();if(!user)redirect("/login");const {data:learner}=await db.from("learners").select("id").eq("id",learnerId).maybeSingle();if(!learner)notFound();return <Lesson learnerId={learnerId}/>;}
