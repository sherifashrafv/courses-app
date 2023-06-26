<template>
  <div class="container my-5">
    <div class="row">
      <h4 style="color: #eee" class="my-5">Our Instructors</h4>
      <div
        v-for="(mentor, i) in list"
        :key="i * 50"
        class="col-lg-2 col-md-3 col-sm-6"
      >
        <div class="box">
          <div class="skeleton">
            <div class="skeleton-left flex1">
              <div class="square circle"></div>
            </div>
            <div class="skeleton-right flex2">
              <div class="line"></div>
              <div class="line h5 w50 mx-auto mt-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["list"],
  name: "skate-mentors-wating",
};
</script>
<style scoped>
.box {
  max-width: 100%;
  width: 100%;
}
.skeleton {
  padding: 15px;
  max-width: 300px;
  width: 100%;
  margin-bottom: 20px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.2),
    0 1px 8px 0 rgba(0, 0, 0, 0.12);
}
.flex1 {
  flex: 1;
}
.skeleton-right {
  flex: 1;
}
.skeleton-left {
  flex: 2;
}
.flex1 {
  flex: 1;
}
.flex2 {
  width: 100px;
  margin-top: 1rem;
}
.skeleton .square {
  height: 80px;
  border-radius: 5px;
  background: rgba(130, 130, 130, 0.2);
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(8%, rgba(130, 130, 130, 0.2)),
    color-stop(18%, rgba(130, 130, 130, 0.3)),
    color-stop(33%, rgba(130, 130, 130, 0.2))
  );
  background: linear-gradient(
    to right,
    rgba(130, 130, 130, 0.2) 8%,
    rgba(130, 130, 130, 0.3) 18%,
    rgba(130, 130, 130, 0.2) 33%
  );
  background-size: 800px 100px;
  animation: wave-squares 2s infinite ease-out;
}
.skeleton .line {
  height: 7px;
  margin-bottom: 6px;
  border-radius: 2px;
  background: rgba(130, 130, 130, 0.2);
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(8%, rgba(130, 130, 130, 0.2)),
    color-stop(18%, rgba(130, 130, 130, 0.3)),
    color-stop(33%, rgba(130, 130, 130, 0.2))
  );
  background: linear-gradient(
    to right,
    rgba(130, 130, 130, 0.2) 8%,
    rgba(130, 130, 130, 0.3) 18%,
    rgba(130, 130, 130, 0.2) 33%
  );
  background-size: 800px 100px;
  animation: wave-lines 2s infinite ease-out;
}
.skeleton .line:last-child {
  margin-bottom: 0;
}
.h5 {
  height: 8px !important;
}
.w50 {
  width: 50% !important;
  width: 50% !important;
}
.m10 {
  margin-bottom: 10px !important;
}
.circle {
  border-radius: 50% !important;
  width: 120px;
  height: 120px;
}
@keyframes wave-lines {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}
@keyframes wave-squares {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}
</style>
