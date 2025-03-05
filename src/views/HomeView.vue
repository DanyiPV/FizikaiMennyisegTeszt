<template>
  <v-container class="my-2">
    <v-row>
      <v-col cols="12" md="6">
        <div style="border: .1vw solid rgb(var(--v-theme-text_color)); width: 100%;" class="rounded-lg">
          <v-card color="transparent">
            <v-card-title style="font-family: 'Orbitron', sans-serif;" class="d-flex align-center">
              <v-icon size="35" class="mr-3">mdi-book-open-variant</v-icon>
              <h3>Gyakorlás</h3>
            </v-card-title>
            
            <v-divider></v-divider>

            <v-card-text>
              <h2 style="font-weight: normal;">Ezen a felületen tudsz gyakorolni / felkészülni a dolgozatokra!</h2>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions class="align-center d-flex justify-center">
              <v-btn 
              style="width: 80%; border: .1vw solid rgb(var(--v-theme-text_color));"
              class="rounded-lg align-center">
                <v-icon size="25" class="mr-3">mdi-play-circle</v-icon>
                Ugrás a felületre
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>

      <v-col cols="12" md="6">
        <div style="border: .1vw solid rgb(var(--v-theme-text_color)); width: 100%;" class="rounded-lg">
          <v-card color="transparent">
            <v-card-title style="font-family: 'Orbitron', sans-serif;" class="d-flex align-center">
              <v-icon size="35" class="mr-3">mdi-file-document-edit-outline</v-icon>
              <h3>Dolgozat</h3>
            </v-card-title>
            
            <v-divider></v-divider>

            <v-card-text>
              <h2 style="font-weight: normal;">Ezen a felületen tekintheted meg a régi / jelenlegi / közeledő dolgozatokat!</h2>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions class="align-center d-flex justify-center">
              <v-btn 
              style="width: 80%; border: .1vw solid rgb(var(--v-theme-text_color));"
              class="rounded-lg text-center">
                <v-icon size="25" class="mr-3">mdi-pencil</v-icon>
                Ugrás a felületre
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="6" offset-md="0">
        <div style="border: .1vw solid rgb(var(--v-theme-text_color));" class="rounded-lg">
          <v-card color="transparent">
            <v-card-title style="font-family: 'Orbitron', sans-serif;" class="d-flex align-center">
              <v-icon size="35" class="mr-3">mdi-school-outline</v-icon>
              <h3>Tanulás</h3>
            </v-card-title>
            
            <v-divider></v-divider>

            <v-card-text>
              <h2 style="font-weight: normal;">Ezen a felületen kezdheted el a tanulást!</h2>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions class="align-center d-flex justify-center">
              <v-btn 
              style="width: 80%; border: .1vw solid rgb(var(--v-theme-text_color));"
              class="rounded-lg text-center">
                <v-icon size="25" class="mr-3">mdi-book-open</v-icon>
                Ugrás a felületre
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>