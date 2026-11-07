import {redirect,notFound} from "next/navigation";
import {createClient} from "@/lib/supabase/server";
import {GEOGRAPHY_UNITS} from "@/content/geography-curriculum";
import {GeographyCurriculumLesson} from "@/components/learning/GeographyCurriculumLesson";
export default async function Page({params}:{params:Promise<{learnerId:string;unitId:string}>}){
 const {learnerId,unitId}=await params;
 if(!GEOGRAPHY_UNITS.some(u=>u.id===unitId))notFound();
 const db=await createClient();const {data:{user}}=await db.auth.getUser();if(!user)redirect("/login");
 const {data:learner}=await db.from("learners").select("id").eq("id",learnerId).maybeSingle();if(!learner)notFound();
 return <GeographyCurriculumLesson learnerId={learnerId} unitId={unitId}/>;
}