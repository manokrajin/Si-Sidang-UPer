<script>
    import { data } from "../../../service/sidangStore";
    import { getDokumenTADetail } from "../../../../service/tugasAkhir";
    import { userStore } from "../../../../login/loginStore";

    console.log($userStore.user.uid)




  
</script>

{#await getDokumenTADetail($userStore.user.uid)}
    loading
{:then dataFeedback}
<body>
    <div class="container mx-auto rounded-xl p-3 w-full">
        <div class="title w-full mx-auto m-5">
            <h2 class="font-semibold text-2xl text-primary text-center w-full">Feedback</h2>
        </div>
        {#each dataFeedback.feedback as data,i}
        <div class="feedbackContainer bg-primary rounded-t-xl p-3 text-white text-center mt-5">
            <div class="dosen">Feedback dari {dataFeedback.feedback[i].nama}</div>
        </div>
        <div class="feedbackContainer bg-white rounded-b-xl p-3 border border-gray">
            <div class="feedback">{dataFeedback.feedback[i].feedback}</div>
        </div>
        {/each}
        
    </div>
</body>
   
{/await}