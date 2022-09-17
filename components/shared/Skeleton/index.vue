<template>
  <div>
    <div class="carousel-card">
      <div class="movie--isloading">
        <div class="loading-image"></div>
        <div class="loading-content">
          <div class="loading-text-container">
            <div class="loading-main-text"></div>
            <div class="loading-sub-text"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["list"],
  name: "skate-loading",
};
</script>
<style scoped>
.movie--isloading {
  height: 252px;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 15px;
}

.movie--isloading .loading-image {
  height: 190px;
  -image: linear-gradient(90deg, #141717 0px, #141717 40px, #141717 80px);
  background-size: 250px;
  -webkit-animation: shine-loading-image-04987a8c 2s infinite ease-out;
  animation: shine-loading-image-04987a8c 2s infinite ease-out;
  background-size: 250px;
  -webkit-animation: shine-loading-image 2s infinite ease-out;
  animation: shine-loading-image 2s infinite ease-out;
}

.movie--isloading .loading-content {
  background: #252a2a;
  padding: 15px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.movie--isloading .loading-content .loading-text-container {
  -ms-flex-preferred-size: 100%;
  flex-basis: 100%;
}

.movie--isloading .loading-content .loading-main-text {
  height: 10px;
  width: 65%;
  margin-bottom: 10px;
  background: #ececec;
  background-image: -webkit-linear-gradient(
    left,
    #ececec 0px,
    #ddd 40px,
    #ececec 80px
  );
  background-image: -o-linear-gradient(
    left,
    #ececec 0px,
    #ddd 40px,
    #ececec 80px
  );
  background-image: linear-gradient(
    90deg,
    #ececec 0px,
    #ddd 40px,
    #ececec 80px
  );
  background-size: 250px;
  border-radius: 10px;
  -webkit-animation: shine-loading-container-items 2s infinite ease-out;
  animation: shine-loading-container-items 2s infinite ease-out;
  opacity: 0.1;
}

.movie--isloading .loading-content .loading-sub-text {
  height: 10px;
  width: 50%;
  background: #ececec;
  background-image: -webkit-linear-gradient(
    left,
    #ececec 0px,
    #ddd 40px,
    #ececec 80px
  );
  background-image: -o-linear-gradient(
    left,
    #ececec 0px,
    #ddd 40px,
    #ececec 80px
  );
  background-image: linear-gradient(
    90deg,
    #ececec 0px,
    #ddd 40px,
    #ececec 80px
  );
  background-size: 250px;
  border-radius: 10px;
  opacity: 0.1;
  -webkit-animation: shine-loading-container-items 2s infinite ease-out;
  animation: shine-loading-container-items 2s infinite ease-out;
}

.movie--isloading .loading-content .loading-btn {
  width: 60px;
  height: 25px;
  background: #ececec;
  background-image: -webkit-linear-gradient(
    left,
    #ececec 0px,
    #ddd 40px,
    #ececec 80px
  );
  background-image: -o-linear-gradient(
    left,
    #ececec 0px,
    #ddd 40px,
    #ececec 80px
  );
  background-image: linear-gradient(
    90deg,
    #ececec 0px,
    #ddd 40px,
    #ececec 80px
  );
  background-size: 250px;
  border-radius: 3px;
  -webkit-animation: shine-loading-container-items 2s infinite ease-out;
  animation: shine-loading-container-items 2s infinite ease-out;
}

@-webkit-keyframes shine-loading-image {
  0% {
    background-position: -32px;
  }
  40%,
  100% {
    background-position: 208px;
  }
}

@keyframes shine-loading-image {
  0% {
    background-position: -32px;
  }
  40%,
  100% {
    background-position: 208px;
  }
}

@-webkit-keyframes shine-loading-container-items {
  0% {
    background-position: -100px;
  }
  40%,
  100% {
    background-position: 140px;
  }
}

@keyframes shine-loading-container-items {
  0% {
    background-position: -100px;
  }
  40%,
  100% {
    background-position: 140px;
  }
}
</style>
