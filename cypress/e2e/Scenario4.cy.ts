import { uploadPage } from '../support/pages/uploadPage';

const fileLocation = 'cypress/fixtures/'
const dragDropFile = 'to_send1.txt';
const browseFile = 'to_send2.txt';
const expectedMessage = ' file(s) selected'

const expectFileCount = (count: number) => {
  uploadPage.finalStatusElement().should('contain', `${count}` + expectedMessage);
};

describe('Scenario 4 - File Upload', () => {
  beforeEach(() => {
    uploadPage.visit();
  });

  it('Uploads a file via Drag and drop', () => {
    uploadPage.dropFile(fileLocation + dragDropFile);
    uploadPage.frame().should('contain', dragDropFile);

    expectFileCount(1);
  });

  it('Uploads a file via Browse', () => {
    uploadPage.browseFile(fileLocation + browseFile);
    uploadPage.frame().should('contain', browseFile);

    expectFileCount(1);
  });

  it('Uploads a file via Both Methods', () => {
    uploadPage.dropFile(fileLocation + dragDropFile);
    uploadPage.frame().should('contain', dragDropFile);

    uploadPage.browseFile(fileLocation + browseFile);
    uploadPage.frame().should('contain', browseFile);

    expectFileCount(2);
  });
});