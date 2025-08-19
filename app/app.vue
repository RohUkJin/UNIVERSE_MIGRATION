<template>
  <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}

h1,
h2,
h3,
h4,
p,
span {
  word-break: keep-all;
  margin: 0;
  padding: 0;
}

ul {
  padding: 0;
}

li {
  list-style: none;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

a {
  text-decoration: none;
}

button {
  background: none;
  border: 0;
  outline: 0;
  padding: 0;
}

.inner {
  max-width: 1200px;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.1s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>