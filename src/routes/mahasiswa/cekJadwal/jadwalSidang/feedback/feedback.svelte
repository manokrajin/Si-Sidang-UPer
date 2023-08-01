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
    <div class="container mx-auto border rounded-xl p-3">
        <div class="title w-full mx-auto">
            <h2 class="font-semibold text-2xl text-primary text-center w-full">Feedback</h2>
        </div>
        {#each dataFeedback.feedback as data,i}
        <div class="feedbackContainer bg-primary">
            <div class="dosen">{data.feedback[i].feedback}</div>
        </div>
        {/each}
        
    </div>
</body>
   
{/await}