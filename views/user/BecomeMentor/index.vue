<template>
  <div>
    <!--  -->
    <section class="become_mentor_sec-bg">
      <div class="container">
        <div class="row">
          <div class="influence-international-learners text-center">
            <h3 class="influence-international-learners__title">
              Inspire learners across the world.
            </h3>
            <p class="influence-international-learners__subtitle">
              Join us in creating an exceptional learning experience.
            </p>
            <button
              @click="showModalHandler"
              style="
                width: 242px !important;
                padding: 0px;
                height: 53px !important;
                font-weight: 400;
              "
              class="btn-home-vedios border-0 mt-3"
            >
              Apply as Instructor
            </button>
            <InstractorsModal
              :show="ShowModal"
              :modalHide="hideModal"
              @cancelHandel="hideModal"
            ></InstractorsModal>
          </div>
        </div>
        <div class="influence-international-learners__card">
          <div class="row">
            <div
              class="influence-international-learners__card-item col-lg-4 col-md-4 m-auto col-sm-12"
            >
              <img src="@/assets/Images/BecomeMentor/svg_col1.svg" alt="" />
              <h5 class="influence-international-learners__card-title">
                Competitive Revenue Share
              </h5>
              <p class="influence-international-learners__card-subtitle">
                we offer competitive profit sharing models based on your video
                production choice.
              </p>
            </div>
            <div
              class="influence-international-learners__card-item col-lg-4 m-auto col-sm-12"
            >
              <img src="@/assets/Images/BecomeMentor/svg_col2.svg" alt="" />
              <h5 class="influence-international-learners__card-title">
                Competitive Revenue Share
              </h5>
              <p class="influence-international-learners__card-subtitle">
                we offer competitive profit sharing models based on your video
                production choice.
              </p>
            </div>
            <div
              class="influence-international-learners__card-item col-lg-4 m-auto col-sm-12"
            >
              <img src="@/assets/Images/BecomeMentor/svg_col3.svg" alt="" />
              <h5 class="influence-international-learners__card-title">
                Competitive Revenue Share
              </h5>
              <p class="influence-international-learners__card-subtitle">
                we offer competitive profit sharing models based on your video
                production choice.
              </p>
            </div>
          </div>
        </div>
        <!-- section-2 -->
      </div>
    </section>
    <!--  -->
    <section class="produce-your-own-course">
      <h2 class="produce-your-own-course__title">Produce your own course</h2>
      <div
        class="d-flex flex-row flex-grow-1 flex-wrap justify-content-center align-items-center"
      >
        <div class="produce-your-own-course_card col-lg-4">
          <img src="@/assets/Images/BecomeMentor/typewriter.svg" alt="" />
          <div class="produce-your-own-course__item-text-wrapper">
            <h5 class="produce-your-own-course__item-number">1</h5>
            <p class="produce-your-own-course__item-title first-item">
              Prepare your content.
            </p>
          </div>
        </div>
        <div class="produce-your-own-course_card col-lg-4">
          <img src="@/assets/Images/BecomeMentor/videographer.svg" alt="" />
          <div class="produce-your-own-course__item-text-wrapper">
            <h5 class="produce-your-own-course__item-number">2</h5>
            <p class="produce-your-own-course__item-title first-item">
              Shoot your course.
            </p>
          </div>
        </div>
        <div class="produce-your-own-course_card col-lg-4">
          <img src="@/assets/Images/BecomeMentor/studying.svg" alt="" />
          <div class="produce-your-own-course__item-text-wrapper">
            <h5 class="produce-your-own-course__item-number">3</h5>
            <p class="produce-your-own-course__item-title first-item">
              Submit content for review.
            </p>
          </div>
        </div>
      </div>
    </section>
    <!-- make-successful-course -->
    <section class="make-successful-course">
      <div class="container">
        <div class="make-successful-course__text-wrapper">
          <h4 class="make-successful-course__title">
            Become an instructor and get free instructional resources.
          </h4>
          <p class="make-successful-course__subtitle">
            Learn from our experts the course creation guidelines and production
            techniques.
          </p>
          <iframe
            class="mt-3"
            width="100%"
            height="600px"
            src="https://www.youtube.com/embed/JClFNqJ2a9M"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <button
            style="
              margin-top: 45px !important;
              width: 242px !important;
              padding: 0px;
              height: 53px !important;
              font-weight: 400;
            "
            class="btn-home-vedios border-0 mt-3"
          >
            Apply as Instructor
          </button>
        </div>
      </div>
    </section>
    <!--  -->
    <section class="subscription-details-page-questions">
      <div class="container">
        <div class="d-flex flex-row align-items-center justify-content-between">
          <div class="subscription-details-page-questions__titles-wrapper">
            <h2 class="subscription-details-page-questions__title">
              How can we help you?
            </h2>
            <p class="subscription-details-page-questions__subtitle">
              See if our FAQs help you know more about our service
            </p>
          </div>
          <div class="img-subscription">
            <img
              src="@/assets/Images/BecomeMentor/subscriptionImg.png"
              alt=""
            />
          </div>
        </div>

        <!-- tabs-animation -->
        <div class="main_tabs-wrapper">
          <div
            @click="tabActive1()"
            role="button"
            class="d-flex flex-row align-items-center justify-content-between"
          >
            <div class="subscription-details-question_title">
              What should the sample video include?
            </div>
            <div>
              <i class="fa-solid fa-chevron-down"></i>
            </div>
          </div>
          <div ref="tab1" class="inner_details_qus">
            <p role="button" @click="tabActive1()">
              The sample video is a 3 to 5 mins video; you should represent the
              course content and ideas through this video. To be given full
              feedback, you will need to appear talking and some slide
              insertions or visual presentations following our guidelines.
            </p>
          </div>
        </div>
        <div class="main_tabs-wrapper">
          <div
            @click="tabActive2()"
            role="button"
            class="d-flex flex-row align-items-center justify-content-between"
          >
            <div class="subscription-details-question_title">
              When should I expect to get feedback on my sample video?
            </div>
            <div>
              <i class="fa-solid fa-chevron-down"></i>
            </div>
          </div>
          <div ref="tab2" class="inner_details_qus">
            <p role="button" @click="tabActive2()">
              The content team will review the sample video and get back to you
              with feedback within 5 working days.
            </p>
          </div>
        </div>
        <div class="main_tabs-wrapper">
          <div
            @click="tabActive3()"
            role="button"
            class="d-flex flex-row align-items-center justify-content-between"
          >
            <div class="subscription-details-question_title">
              When should I expect to get feedback on my sample video?When
              should I expect to get feedback on my sample video?
            </div>
            <div>
              <i class="fa-solid fa-chevron-down"></i>
            </div>
          </div>
          <div ref="tab3" class="inner_details_qus">
            <p role="button" @click="tabActive3()">
              The sample video is a 3 to 5 mins video; you should represent the
              course content and ideas through this video. To be given full
              feedback, you will need to appear talking and some slide
              insertions or visual presentations following our guidelines.
            </p>
          </div>
        </div>
        <div class="main_tabs-wrapper">
          <div
            @click="tabActive4()"
            role="button"
            class="d-flex flex-row align-items-center justify-content-between"
          >
            <div class="subscription-details-question_title">
              What is the process after sending the sample video?
            </div>
            <div>
              <i class="fa-solid fa-chevron-down"></i>
            </div>
          </div>
          <div ref="tab4" class="inner_details_qus">
            <p role="button" @click="tabActive4()">
              After sending the sample video, you will go through the following
              steps: The content team will review the sample video and provide
              you with feedback, whether it’s (Accepted, Rejected or Requires
              edits). If the sample video requires edits, you will be requested
              to consider those edits and provide a final sample. Once the
              sample video is approved, you will shoot the whole course
              following the same quality of the approved sample video. By
              completing the course, you will send us the following required
              files (Course outline and mentor profile in both English and
              Arabic, High-quality photo with solid background)
            </p>
          </div>
        </div>
        <div class="main_tabs-wrapper">
          <div
            @click="tabActive5()"
            role="button"
            class="d-flex flex-row align-items-center justify-content-between"
          >
            <div class="subscription-details-question_title">
              When can I review and sign the contract?
            </div>
            <div>
              <i class="fa-solid fa-chevron-down"></i>
            </div>
          </div>
          <div ref="tab5" class="inner_details_qus">
            <p role="button" @click="tabActive5()">
              Once you complete the course, we will share the contract to check
              and sign; you will receive a signed copy from our end.
            </p>
          </div>
        </div>

        <!-- end -->
      </div>
    </section>
  </div>
</template>
<script>
import InstractorsModal from "../../../components/User/ModalInstractors/index.vue";
export default {
  name: "modal-Instractors",
  data() {
    return {
      ShowModal: false,
      id: null,
      accepted: "",
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    insturctor() {
      return this.$store.state.insturctor;
    },
  },
  components: {
    InstractorsModal,
  },
  methods: {
    tabActive1() {
      this.$refs.tab1.classList.toggle("active");
    },
    tabActive2() {
      this.$refs.tab2.classList.toggle("active");
    },
    tabActive3() {
      this.$refs.tab3.classList.toggle("active");
    },
    tabActive4() {
      this.$refs.tab4.classList.toggle("active");
    },
    tabActive5() {
      this.$refs.tab5.classList.toggle("active");
    },
    showModalHandler() {
      this.ShowModal = !this.ShowModal;
    },
    hideModal() {
      this.ShowModal = false;
    },
    getInstructorInformation(id) {
      this.$store.dispatch("getUserInstructor", {
        id: id,
      });
    },
  },
  watch: {
    user(newvalue) {
      if (newvalue) {
        this.accepted = newvalue.InstructorAccepted;
        this.getInstructorInformation(newvalue.id);
      }
    },
    accepted(newvalue) {
      if (newvalue) {
        this.$router.push(
          `/instractor/user/${this.user.email}/id/${this.user.id}`
        );
      } else {
        this.$router.push("/become-Mentor");
      }
    },
    insturctor(value) {
      this.accepted = value.accepted;
      this.email = value.Email;
      this.id = value.id;
    },
  },
  mounted() {
    const user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push("/login");
    }
  },
};
</script>
