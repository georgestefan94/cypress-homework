class UploadPage {
  private url = 'https://uitestingplayground.com/upload';

  private selectors = {
    frame: 'iframe',
    dropZone: '.document-uploader',
    fileInput: 'input[type="file"]',
    successText: '.success-file'
  };

  visit() {
    cy.visit(this.url);
    cy.frameLoaded(this.selectors.frame);
  }

  frame() {
    return cy.iframe(this.selectors.frame);
  }

  dropFile(filePath: string) {
    this.frame()
      .find(this.selectors.dropZone)
      .selectFile(filePath, { action: 'drag-drop' });
  }

  browseFile(filePath: string) {
    this.frame()
      .find(this.selectors.fileInput)
      .selectFile(filePath, { force: true });
  }

  finalStatusElement()
  {
    return this.frame()
      .find(this.selectors.successText)
  }
}

export const uploadPage = new UploadPage();