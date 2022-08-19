<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h4 class="my-5">Our Instructors</h4>
        <div class="row">
          <div
            class="instractors_parent_container d-flex flex-row justify-content-center"
          >
            <div class="mentor-cards-container_item mb-5">
              <img
                class="img_mentor-personal"
                src="@/assets/Images/users/download.png"
              />
              <h5 class="mentor-card__author mt-2">ahmed sheko</h5>
              <p class="mentor_card_bio">
                Professor of Marketing and Management
              </p>
            </div>
            <div class="mentor-cards-container_item mb-5">
              <img
                class="img_mentor-personal"
                src="@/assets/Images/users/download.png"
              />
              <h5 class="mentor-card__author mt-2">ahmed sheko</h5>
              <p class="mentor_card_bio">
                Professor of Marketing and Management
              </p>
            </div>
            <div class="mentor-cards-container_item mb-5">
              <img
                class="img_mentor-personal"
                src="@/assets/Images/users/download.png"
              />
              <h5 class="mentor-card__author mt-2">ahmed sheko</h5>
              <p class="mentor_card_bio">
                Professor of Marketing and Management
              </p>
            </div>
            <div class="mentor-cards-container_item mb-5">
              <img
                class="img_mentor-personal"
                src="@/assets/Images/users/download.png"
              />
              <h5 class="mentor-card__author mt-2">ahmed sheko</h5>
              <p class="mentor_card_bio">
                Professor of Marketing and Management
              </p>
            </div>
            <div class="mentor-cards-container_item mb-5">
              <img
                class="img_mentor-personal"
                src="@/assets/Images/users/download.png"
              />
              <h5 class="mentor-card__author mt-2">ahmed sheko</h5>
              <p class="mentor_card_bio">
                Professor of Marketing and Management
              </p>
            </div>
            <div class="mentor-cards-container_item mb-5">
              <img
                class="img_mentor-personal"
                src="@/assets/Images/users/download.png"
              />
              <h5 class="mentor-card__author mt-2">ahmed sheko</h5>
              <p class="mentor_card_bio">
                Professor of Marketing and Management
              </p>
            </div>
            <div class="mentor-cards-container_item mb-5">
              <img
                class="img_mentor-personal"
                src="@/assets/Images/users/download.png"
              />
              <h5 class="mentor-card__author mt-2">ahmed sheko</h5>
              <p class="mentor_card_bio">
                Professor of Marketing and Management
              </p>
            </div>
            <div class="mentor-cards-container_item mb-5">
              <img
                class="img_mentor-personal"
                src="@/assets/Images/users/download.png"
              />
              <h5 class="mentor-card__author mt-2">ahmed sheko</h5>
              <p class="mentor_card_bio">
                Professor of Marketing and Management
              </p>
            </div>
            <div class="mentor-cards-container_item mb-5">
              <img
                class="img_mentor-personal"
                src="@/assets/Images/users/download.png"
              />
              <h5 class="mentor-card__author mt-2">ahmed sheko</h5>
              <p class="mentor_card_bio">
                Professor of Marketing and Management
              </p>
            </div>
            <div class="mentor-cards-container_item mb-5">
              <img
                class="img_mentor-personal"
                src="@/assets/Images/users/download.png"
              />
              <h5 class="mentor-card__author mt-2">ahmed sheko</h5>
              <p class="mentor_card_bio">
                Professor of Marketing and Management
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "instractors-page",
};
</script>
<style>
/* .mentor-cards-container_item {
} */
.instractors_parent_container {
  width: 1140px;
  align-items: baseline;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap !important;
}
.instractors_parent_container div {
  height: 711px;
  width: calc(100% / 5);
  height: 282px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.mentor_card_bio {
  font-size: 14px;
  color: var(--author-bio);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin: 0;
  width: 146px;
  color: #a1a1a1;
}
.img_mentor-personal {
  max-width: 120px;
  max-height: 120px;
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 24px;
}
.mentor-card__author {
  line-height: 1.94;
  letter-spacing: 0.36px;
  font-weight: 500;
  color: var(--map-numbers-count);
  margin-bottom: 8px;
  width: 200px;
  font-size: 21px;
  text-transform: capitalize;
  font-weight: 600;
}
.mentor_card_bio {
  font-size: 14px;
  color: #a1a1a1;
}
</style>
