<template>
  <q-page>
    <div class="q-pa-md">
    <q-list
    bordered
    separator
    >

    <q-slide-item 
      v-for="entry in entries" 
      :key="entry.id"
      @right="onEntrySlideRight($event, entry)"
      left-color="positive" 
      right-color="negative"
    >

        <template v-slot:right>
          <q-icon name="delete" />
        </template>

          <q-item>
            <q-item-section
            class="text-weight-bold"
            :class="useAmountColorClass(entry.amount)"
            >
              {{entry.name}}
            </q-item-section>

            <q-item-section 
            class="text-weight-bold"
            :class="useAmountColorClass(entry.amount)"
            side>
              {{ useCurrencify(entry.amount) }}
            </q-item-section>
          </q-item>
    </q-slide-item>    

    </q-list>
  </div>

  <q-footer
    class="bg-transparent"
  >
    <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3">
      <div class="col text-grey-7 text-h6">
        Balance :
      </div>
      <div 
      :class="useAmountColorClass(balance)"
      class="col text-h6 text-right">
        {{ useCurrencify(balance) }}
      </div>
    </div>

    <q-form 
    @submit="addEntry"
    class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary">
      <div class="col">
        <q-input  
        ref="nameRef"
        v-model="addEntryForm.name"
        placeholder="Name" 
        bg-color="white"
        outlined
        dense
        />
      </div>
      <div class="col">
        <q-input  
        v-model.number="addEntryForm.amount"
        input-class="text-right" 
        type="number"
        placeholder="Amount" 
        bg-color="white"
        step="0.01"
        outlined
        dense
        />
      </div>
      <div class="col col-auto">
        <q-btn 
        round color="primary" 
        icon="add" 
        type="submit"
        />
      </div>
    </q-form>
  </q-footer>

  </q-page>
</template>

<script setup>

  /*Imports */
  import {ref, computed, reactive} from 'vue'
  import {uid, useQuasar} from 'quasar'
  import {useCurrencify} from 'src/use/useCurrencify.js'
  import { useAmountColorClass } from 'src/use/useAmountColorClass.js';

  /* useQuasar */
  const $q = useQuasar()


  /* Entries */
  const entries = ref([
    {
      id: 'id1',
      name: 'Salary',
      amount: 5500.99
    },
    {
      id: 'id2',
      name: 'Rent',
      amount: -300
    },
    {
      id: 'id3',
      name: 'Internet',
      amount: -150
    },
    {
      id: 'id4',
      name: 'Unknown',
      amount: 0
    },
  ])

  /* Balance */

  const balance = computed(() =>{
    return entries.value.reduce((accumulator, {amount})=> {
      return accumulator + amount
    }, 0)
  })

  const nameRef = ref(null)

  const addentryformDefault = {
    name: '',
    amount: null
  }

  /* ADD*/
  const addEntryForm = reactive ({
    ...addentryformDefault
  })

  //reset form input
  const addEntryFormReset = () => {
    Object.assign(addEntryForm, addentryformDefault)
    nameRef.value.focus()
  }

  const addEntry = () => {
      const newEntry = Object.assign({}, addEntryForm, {id:uid() })
      entries.value.push(newEntry)
      addEntryFormReset()
  }

  /* Slide Items */
  const onEntrySlideRight = ({reset}, entry) => {
    $q.dialog({
        title: 'Delete Entry',
        message: `Delete this entry?'
          <div class="q-mt-md text-weight-bold ${useAmountColorClass(entry.amount)}">
            ${ entry.name } : ${ useCurrencify(entry.amount) }
          </div>
        `,
        cancel: true,
        persistent: true,
        html: true,
        ok:{
          label: 'Delete',
          color: 'negative',
          noCaps: true
        },
        cancel:{
          color: 'primary',
          noCaps: true
        }
      }).onOk(() => {
         deleteEntry(entry.id)
      }).onCancel(() => {
         reset()
      })
  }

  /*delete entry */
  const deleteEntry = entryId => {
    const index =  entries.value.findIndex(entry => entry.id === entryId)
    entries.value.splice(index, 1)
    $q.notify({
      message :'Entry Deleted',
      position: 'top'
    })
  }

</script>