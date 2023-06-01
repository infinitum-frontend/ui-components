// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react'
import { StoryObj, StoryFn, Meta } from '@storybook/react'
import { Modal } from './index'
import { Button } from 'Components/Button'
import {
  NotificationContainer,
  NotificationProvider,
  useNotification
} from '../Notification'

const meta: Meta<typeof Modal> = {
  title: 'Overlay/Modal',
  component: Modal
}

export default meta

const Template: StoryFn<typeof Modal> = (args) => {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpened(true)}>Открыть модальное окно</Button>
      <Modal {...args} open={isOpened} onClose={() => setIsOpened(false)}>
        <Modal.Header>
          <Modal.Title>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero
            modi odittttt incidunt nostrum voluptatibus quibusdam!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis
          est adipisci officiis quae provident, dolores quam fuga autem! Labore,
          magnam ratione sed atque voluptatem mollitia dolore repudiandae
          officia recusandae molestias possimus accusantium tenetur voluptas
          amet aut neque provident hic consequuntur libero quo. Illo vero nulla
          quia sit eos ullam maiores impedit quod, modi repudiandae, architecto
          incidunt? At doloribus est quo sit provident! Commodi ratione dicta
          ut, accusamus vel eaque praesentium eos ipsum odio rem unde
          consectetur quam consequatur a hic aut autem adipisci voluptatem sunt
          reprehenderit et rerum maxime nulla. Sapiente explicabo natus quos qui
          quae molestias cupiditate sed animi.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Добавить настройку</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export const Playground = {
  render: Template
}

export const ContentOverflow: StoryObj<typeof Modal> = {
  render: (args) => {
    const [isOpened, setIsOpened] = useState(false)

    return (
      <>
        <Button onClick={() => setIsOpened(true)}>
          Открыть модальное окно
        </Button>
        <Modal {...args} open={isOpened} onClose={() => setIsOpened(false)}>
          <Modal.Header>
            <Modal.Title>Изменение показателя</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam
            voluptas accusamus molestiae, esse optio nemo in minus velit, ea
            voluptatibus aliquid vel vero porro adipisci. Aperiam tempore ab hic
            eum laudantium porro accusamus, ex dolorum reprehenderit aspernatur
            eaque cupiditate, est ducimus libero optio ipsa laborum ullam. In
            incidunt ducimus reprehenderit ut blanditiis accusamus eius. Iste
            cupiditate quibusdam blanditiis reprehenderit doloremque omnis
            obcaecati, asperiores numquam modi nulla quisquam dicta molestias
            saepe eius neque cum vel quos officia natus accusamus itaque minus
            unde sequi? Voluptatibus quidem nulla, odit fugiat architecto enim
            illum repellat doloribus? Architecto, iure reprehenderit adipisci,
            consequatur repellendus in aperiam atque sint, saepe autem
            temporibus assumenda exercitationem labore. Id harum neque
            necessitatibus iste, consequuntur laboriosam numquam quidem ipsam
            obcaecati vero temporibus dolorum et. Sapiente voluptate temporibus
            odio consequatur suscipit ipsam asperiores impedit dolores sint
            laboriosam! Optio porro maiores repudiandae consequuntur. Beatae
            atque sapiente quia, minus voluptatibus iste. Laboriosam cum sunt
            sit optio alias quisquam. Sapiente non consequatur eligendi est
            consectetur ex nemo hic temporibus. Commodi possimus itaque minima
            veniam laboriosam eligendi distinctio libero at fugit consectetur
            nesciunt excepturi, maxime eius molestias aut. Consectetur iure
            inventore esse repellat explicabo voluptatem aliquam tempore
            doloremque. Dolor delectus ipsum dolore exercitationem corporis
            earum enim, nisi, dolorem ipsam officia in unde harum odio nam, ab
            rem praesentium velit impedit? Dolore maiores aperiam perferendis
            fuga consectetur incidunt accusantium provident tenetur dolor,
            itaque alias repudiandae libero placeat mollitia vitae quo, nam
            velit atque? Cum, pariatur libero id blanditiis expedita labore quos
            ex in incidunt! Obcaecati cumque corrupti corporis iusto minima
            eveniet non repellendus, unde, magni consequatur maxime numquam
            placeat voluptates aliquam fuga reprehenderit provident omnis harum
            atque natus expedita aspernatur adipisci ea. Fugiat maiores, facere
            dignissimos incidunt quas repellendus, eligendi quae corrupti
            aliquam, mollitia vero distinctio deserunt sequi tempore temporibus
            beatae nostrum repudiandae consectetur quis nam iusto optio magnam
            asperiores. Autem cum ipsam at, nostrum, quisquam vel eaque facilis
            mollitia earum perferendis debitis quo? Eos animi omnis illum odit
            reiciendis doloremque provident labore aliquid? Aliquid, non
            voluptatem. Eligendi mollitia, explicabo aliquid vel ad quibusdam
            impedit tenetur officiis consequatur veritatis nemo similique eos
            nesciunt nihil quod repudiandae, deleniti blanditiis omnis numquam
            sapiente. Aliquam, at eligendi unde saepe odit quos officiis. Animi,
            sunt. Eligendi ipsum quos facilis quod, ex temporibus? Deleniti
            aliquam incidunt ipsa rerum voluptate vero, consequatur dolore quam
            minus? Eius doloremque molestias nam maiores ipsum cumque,
            similique, ut facere, iste reiciendis debitis nulla at quam? Autem
            tempora quisquam magnam dolor neque architecto illum accusantium
            facilis reiciendis tenetur vel dicta nulla earum, perferendis
            ducimus repudiandae. Natus nemo minima vitae unde recusandae rem
            dolorum labore a commodi, ex molestias quibusdam molestiae est
            numquam! Cumque sed soluta excepturi doloribus quisquam earum ipsa
            dolorum, aspernatur sequi praesentium odit asperiores! Eveniet
            tenetur consequatur aspernatur blanditiis quam explicabo molestias
            corporis, enim hic, sed consequuntur qui. Quo, perferendis sint
            accusamus reprehenderit aliquid porro ullam saepe asperiores
            repudiandae unde optio provident ratione quis quidem illum
            cupiditate odio atque. A quis dolore perspiciatis rem vero. Quis
            commodi unde reiciendis dolores quod adipisci placeat excepturi
            beatae illo sunt pariatur, explicabo minus molestiae ratione
            provident autem totam possimus maxime dolorum voluptatum recusandae
            ipsam asperiores cumque. Consequuntur asperiores esse, tempora
            corporis at aperiam ab! Veritatis, illum laboriosam obcaecati
            incidunt harum provident aliquam. Commodi perferendis praesentium
            iste ea magnam quam. Facere aliquam consequatur sunt neque
            distinctio expedita? Dolor quo dolorem nisi dolorum ducimus illo
            veritatis officia beatae? Voluptatem iste officia quidem vero
            corporis quod, odio iusto molestias incidunt aliquid laborum,
            quaerat, eaque adipisci eius rem voluptatibus qui reiciendis placeat
            culpa ipsa ipsam! Non a porro illum quaerat quam aperiam autem ex
            tempore quia ipsa? Id quaerat quos libero recusandae repellat! Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            laboriosam qui magni sapiente nisi autem, cumque vero, earum
            veritatis sequi aliquid illo. Vitae nostrum iusto voluptatibus ipsam
            tempora facilis blanditiis? Aliquam, libero dicta doloribus facere
            accusantium provident corrupti numquam? Itaque asperiores modi earum
            molestiae odio totam qui quas alias debitis, repudiandae fugiat
            accusantium eum laborum expedita, a nobis explicabo amet quidem
            perferendis odit magnam aspernatur atque rerum. Fugiat, corporis
            quibusdam odit magnam qui voluptatum! Laborum incidunt reiciendis
            qui eos iusto nihil repellat animi, recusandae et delectus, atque
            est autem repellendus porro error. Ducimus, natus ipsum recusandae
            ut dolorem placeat odit?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">Добавить настройку</Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export const ModalWithNotification: StoryObj<typeof Modal> = {
  decorators: [
    (Story) => {
      return (
        <NotificationProvider>
          <Story />
          <NotificationContainer />
        </NotificationProvider>
      )
    }
  ],
  render: (args) => {
    const [isOpened, setIsOpened] = useState(false)
    const notify = useNotification()

    return (
      <>
        <Button onClick={() => setIsOpened(true)}>
          Открыть модальное окно
        </Button>
        <Modal {...args} open={isOpened} onClose={() => setIsOpened(false)}>
          <Modal.Header>
            <Modal.Title>
              При закрытии/нажатии на модификацию модальное окно не будет
              закрыто
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Button
              onClick={() =>
                notify(`some message ${new Date().getTime()}`, {
                  duration: 10000
                })
              }
            >
              Открыть нотификацию
            </Button>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}
